{{-- resources/views/emails/contact-message-html.blade.php --}}
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau message de contact</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .info-box { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .label { font-weight: bold; color: #667eea; display: inline-block; width: 100px; }
        .message-box { background: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
        .btn { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 25px; margin-top: 20px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📨 Nouveau message de contact</h1>
            <p>Reçu le {{ now()->format('d/m/Y à H:i') }}</p>
        </div>
        
        <div class="content">
            <div class="info-box">
                <h3>👤 Informations de l'expéditeur</h3>
                <p><span class="label">Nom :</span> {{ $contact['name'] }}</p>
                <p><span class="label">Email :</span> <a href="mailto:{{ $contact['email'] }}">{{ $contact['email'] }}</a></p>
                <p><span class="label">Téléphone :</span> {{ $contact['phone'] ?? 'Non renseigné' }}</p>
                <p><span class="label">Sujet :</span> {{ $contact['subject'] ?? 'Sans sujet' }}</p>
            </div>

            <div class="message-box">
                <h3>📝 Message</h3>
                <p style="white-space: pre-wrap;">{{ $contact['message'] }}</p>
            </div>

            <center>
                <a href="mailto:{{ $contact['email'] }}?subject=Re: {{ urlencode($contact['subject'] ?? 'Contact') }}" class="btn">
                    Répondre à {{ $contact['name'] }}
                </a>
            </center>
        </div>

        <div class="footer">
            <p>Ce message a été envoyé automatiquement depuis {{ config('app.name') }}</p>
        </div>
    </div>
</body>
</html>