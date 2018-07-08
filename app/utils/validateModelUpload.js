
//Recieving whole model, incase I put restriction on file size as well.
//For now just file extension.
//Could be regex instead too, but this is fine.
export const validFileTypes = ["obj","xk3g"];

export default function isValidUpload(model){


    //Validating file type.
    //Make an array splitting on ., then get last part split, this is the extension.
    const fileExtension = model.name.split(".").pop();
    console.log("file extenstion of", model.name, "is ", fileExtension);

    var matchedAFiletype = false;
    for (const i in validFileTypes){

        if (fileExtension === validFileTypes[i]){
            matchedAFiletype = true;
            break;
        }
    }

    if (!matchedAFiletype){
        return false;
    }


    return true;

    


}