<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class PortfolioController extends Controller
{
    public function index()
    {
        $data = Portfolio::orderBy('id', 'desc')->get();
        return response()->json([
            'portfolios' => $data
        ]);
    }

    public function allPorfolios()
    {
        $data = Portfolio::orderBy('id', 'desc')->paginate(9);
        return response()->json([
            'portfolios' => $data
        ]);
    }

    public function latestPortfolios()
    {
        $data = Portfolio::orderBy('id', 'desc')->limit(6)->get();
        return response()->json([
            'portfolios' => $data
        ]);
    }

    public function showslug($slug)
    {
        $data = Portfolio::where('slug', $slug)->first();
        if (!$data) {
            return response()->json(['message' => 'Portfolio not found'], 404);
        }
        return response()->json([
            'portfolio' => $data
        ]);
    }

    public function show($id)
    {
        $data = Portfolio::find($id);
        if (!$data) {
            return response()->json(['message' => 'Portfolio not found'], 404);
        }
        return response()->json([
            'portfolio' => $data
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image_path' => 'nullable|image|mimes:jpg,jpeg,png,webp',
            'link' => 'nullable|url',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        // Traiter l'upload d'image
        if ($request->hasFile('image_path')) {
            $file = $request->file('image_path');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('portfolios', $filename, 'public');
            $validated['image_path'] = '/storage/portfolios/' . $filename;
        }

        $data = Portfolio::create($validated);
        return response()->json([
            'message' => 'Portfolio created successfully',
            'portfolio' => $data
        ]);
    }

    public function update(Request $request, $id)
    {
        $data = Portfolio::find($id);
        if (!$data) {
            return response()->json(['message' => 'Portfolio not found'], 404);
        }

        // Validation conditionnelle pour image_path
        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'link' => 'nullable|url',
        ];

        // Ajouter la validation d'image SEULEMENT si un fichier est envoyé
        if ($request->hasFile('image_path')) {
            $rules['image_path'] = 'image|mimes:jpg,jpeg,png,webp';
        }

        $validated = $request->validate($rules);

        // Traiter l'upload d'image
        if ($request->hasFile('image_path')) {
            $file = $request->file('image_path');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('portfolios', $filename, 'public');
            $validated['image_path'] = '/storage/portfolios/' . $filename;
        }

        // Mettre à jour le slug si le titre a changé
        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $data->update($validated);

        return response()->json([
            'message' => 'Portfolio updated successfully',
            'portfolio' => $data
        ]);
    }

    public function destroy($id)
    {
        $data = Portfolio::find($id);
        if (!$data) {
            return response()->json(['message' => 'Portfolio not found'], 404);
        }

        // Supprimer l'image si elle existe
        if ($data->image_path) {
            // Convertir le chemin public en chemin de stockage
            $imagePath = str_replace('/storage/', 'public/', $data->image_path);
            if (Storage::exists($imagePath)) {
                Storage::delete($imagePath);
            }
        }

        $data->delete();
        return response()->json([
            'message' => 'Portfolio deleted successfully'
        ]);
    }
}
