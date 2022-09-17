<?php
// Creating directories for the script
mkdir("uploads");
mkdir("uploads/hotdogs");
mkdir("uploads/nothotdogs");
mkdir("uploads/others");

// If no mistakes than procced to uploading the file
if ($_FILES && $_FILES['filename']['error'] == UPLOAD_ERR_OK) {
    $uploaddir = 'uploads/';
    $date = date("d.m.y_H.i.s");
    $extension  = pathinfo($_FILES['filename']['name'], PATHINFO_EXTENSION);
    
    // Changing uploaddir for the specific type of uploaded file
    switch ($_POST['type']) {
        case 'hotdog':
            $uploaddir .= 'hotdogs/';
            break;
        case 'nothotdog':
            $uploaddir .= 'nothotdogs/';
            break;
        case 'other':
            $uploaddir .= 'others/';
            break;
    }
    
    // If there is a type than slightly change the uploaded file name
    if ($_POST['type']) {
        $uploadfile = $uploaddir.$date.'_'.$_POST['type'].'.'.$extension;
    } else {
        $uploadfile = $uploaddir.$date.'.'.$extension;
    }
    
    // Attempt to move uploaded file
    if (move_uploaded_file($_FILES['filename']['tmp_name'], $uploadfile)) {
        echo "Файл загружен";
    } else {
        echo "Ошибка!";
    }
    
}
?>