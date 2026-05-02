
export function initTinyMCE(el, options) {
    tinymce.init({
        selector: '#' + el,
        menubar: true,
        language: 'fr_FR',
        content_style: 'body { background-color: white; }',

        //content_css: 'document',
        plugins: 'print importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars',
        toolbar: 'undo redo | bold italic underline | link image media | floatleft floatright | forecolor backcolor | alignleft aligncenter alignright alignjustify | fullscreen | lineheight | fontselect fontsizeselect formatselect | numlist bullist | outdent indent | pagebreak | table',

        // ⚡ Configuration pour conserver les styles Word
        paste_data_images: true, // permet de coller les images
        paste_webkit_styles: "all", // garde TOUS les styles inline
        paste_retain_style_properties: "all", // conserve couleurs, polices, alignements, etc.
        content_css: 'document',

        extended_valid_elements: 'iframe[src|width|height|name|align|frameborder|allow|allowfullscreen]',
        media_live_embeds: true,

        // ✅ ✅ Handler d’upload personnalisé
        images_upload_url: function (blobInfo, success, failure) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/uploadimgTi');

            const token = localStorage.getItem('token');
            if (token) {
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            }

            xhr.onload = function () {
                if (xhr.status !== 200) {
                    failure('Erreur HTTP : ' + xhr.status);
                    return;
                }

                const json = JSON.parse(xhr.responseText);
                if (!json || typeof json.location !== 'string') {
                    failure('Réponse JSON invalide : ' + xhr.responseText);
                    return;
                }

                success(json.location);
            };

            const formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());

            xhr.send(formData);
        },

        // Détecter les images collées et uploader si nécessaire
        paste_postprocess: function (plugin, args) {
            handleWordImagesUpload(args.editor);
        },

        automatic_uploads: true,
        file_picker_types: 'image media',
        file_picker_callback: function (cb, value, meta) {
            if (meta.filetype === 'image') {
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.onchange = function () {
                    const file = this.files[0];
                    const reader = new FileReader();
                    reader.onload = function () {
                        const id = 'blobid' + (new Date()).getTime();
                        const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                        const base64 = reader.result.split(',')[1];
                        const blobInfo = blobCache.create(id, file, base64);
                        blobCache.add(blobInfo);
                        cb(blobInfo.blobUri(), { title: '/' + file.name });
                    };
                    reader.readAsDataURL(file);
                };
                input.click();
            }
            if (meta.filetype === 'media') {
                const useUrl = confirm("Voulez-vous insérer une vidéo depuis un lien (YouTube/Vimeo) ? OK = lien, Annuler = fichier local");
                if (useUrl) {
                    // Si l'utilisateur veut un lien externe
                    const url = prompt("Collez le lien de votre vidéo (YouTube, Vimeo...)");
                    if (url) {
                        cb(url, { title: 'Vidéo intégrée' });
                    }
                } else {
                    // Sinon, on laisse l'upload local
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'video/*');
                    input.onchange = function () {
                        const file = this.files[0];
                        const reader = new FileReader();
                        reader.onload = function () {
                            const id = 'blobid' + (new Date()).getTime();
                            const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                            const base64 = reader.result.split(',')[1];
                            const blobInfo = blobCache.create(id, file, base64);
                            blobCache.add(blobInfo);
                            cb(blobInfo.blobUri(), { title: '/' + file.name });
                        };
                        reader.readAsDataURL(file);
                    };
                    input.click();
                }
            }
        },
        ...options
    });

    // Prevent Bootstrap dialog from blocking focusin for TinyMCE
    document.addEventListener('focusin', (e) => {
        if (e.target.closest(".tox-tinymce-aux, .moxman-window, .tam-assetmanager-root") !== null) {
            e.stopImmediatePropagation();
        }
    });
}

// Fonction utilitaire pour convertir base64 en Blob
function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

// Amélioration du paste_postprocess pour Word Desktop
function handleWordImagesUpload(editor) {
    const imgs = editor.getBody().querySelectorAll('img');
    imgs.forEach(img => {
        // Si c'est déjà un src externe, on ignore
        if (img.src.startsWith('http') || img.src.startsWith('/')) return;

        // Gestion des images inline base64
        if (img.src.startsWith('data:')) {
            const blob = dataURLtoBlob(img.src);
            const formData = new FormData();
            formData.append('file', blob, 'word-image.png');

            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/uploadimgTi');
            const token = localStorage.getItem('token');
            if (token) {
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            }

            xhr.onload = function () {
                if (xhr.status === 200) {
                    const json = JSON.parse(xhr.responseText);
                    img.src = json.location; // remplace base64 par URL serveur
                }
            };
            xhr.send(formData);
        }

        // Détecter les float shapes Word Desktop
        // Word Desktop ajoute souvent style="position:absolute;…"
        const floatStyle = img.style.cssText || img.getAttribute('style');
        if (floatStyle && floatStyle.includes('position:absolute')) {
            // On met le float à gauche ou droite selon Word
            if (floatStyle.includes('left')) img.style.cssFloat = 'left';
            else if (floatStyle.includes('right')) img.style.cssFloat = 'right';

            // On ajoute un peu de marge pour que le texte entoure
            img.style.margin = '0 10px 10px 0';
            // Supprime la position absolute pour TinyMCE
            img.style.position = 'static';
        }
    });
}

export function updateTinyMCE(el, content) {
    tinymce.get(el).setContent(content);
}

export function destroyTinyMCE(el) {
    tinymce.get(el).destroy();
}
