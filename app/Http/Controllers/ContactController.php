<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessageMail;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function index(){
        $data = Contact::orderBy('id','desc')->get();
        return response()->json([
            'contacts' => $data
        ]);
    }

    public function show($id){
        $data = Contact::find($id);
        if (!$data) {
            return response()->json(['message' => 'Contact not found'], 404);
        }
        return response()->json([
            'contact' => $data
        ]);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);
        $data = Contact::create($validated);

        Mail::to('soheholmes7@gmail.com')->send(new ContactMessageMail($validated));

        return response()->json([
            'message' => 'Contact created successfully',
            'contact' => $data
        ]);
    }

    public function update(Request $request, $id){
        $data = Contact::find($id);
        if (!$data) {
            return response()->json(['message' => 'Contact not found'], 404);
        }

        $data->update($request->all());

        return response()->json([
            'message' => 'Contact updated successfully',
            'contact' => $data
        ]);
    }

    public function destroy($id){
        $data = Contact::find($id);
        if (!$data) {
            return response()->json(['message' => 'Contact not found'], 404);
        }
        $data->delete();
        return response()->json([
            'message' => 'Contact deleted successfully'
        ]);
    }

}
