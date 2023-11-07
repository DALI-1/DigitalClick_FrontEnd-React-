<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class IMGController extends Controller
{
    public function UploadIMG(Request $req)
    {
        $image = $req->file('ClientPFP');
        $CompanyName = $req->post("CompanyName");
        $profileImage = $CompanyName . "." . $image->getClientOriginalExtension();
        $destinationPath = public_path('/Images');  
        $image->move($destinationPath,$profileImage);  
        $req->session()->flush();
    }

    
}
