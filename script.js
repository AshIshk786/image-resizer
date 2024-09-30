
const uploadbox = document.querySelector(".upload-box");
previewimg = document.querySelector("img");
fileinput = uploadbox.querySelector("input");
widthinput = document.querySelector(".width input");
heightinput = document.querySelector(".height input");
ratioinput = document.querySelector(".ratio input");
qualityinput = document.querySelector(".quality input");
downloadbtn = document.querySelector(".download-btn");

let orgimageratio;

const MAX_DIGITS = 99999; // Set maximum value

// Function to limit the value to 5 digits
const limitValue = (input) => {
    if (input.value.length > 5) {
        input.value = input.value.slice(0, 5); // Trim the value to the first 5 characters
    }
    if (parseInt(input.value) > MAX_DIGITS) {
        input.value = MAX_DIGITS; // Cap the value at 99999
    }
};

widthinput.disabled = true;
heightinput.disabled = true;
const loadfile = (e) => {
    const file = e.target.files[0];
    previewimg.src = URL.createObjectURL(file);
    previewimg.addEventListener("load", () => {
        widthinput.value = previewimg.naturalWidth;
        heightinput.value = previewimg.naturalHeight;
        orgimageratio = previewimg.naturalWidth / previewimg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
        console.log(orgimageratio);
    });
};
ratioinput.addEventListener("change", () => {
    if (ratioinput.checked) {
        // Enable width and height inputs when ratio checkbox is checked
        widthinput.disabled = false;
        heightinput.disabled = false;
    } else {
        // Disable them when unchecked
        widthinput.disabled = true;
        heightinput.disabled = true;
    }
});
widthinput.addEventListener("keyup", () => {
    let height;
    limitValue(widthinput); // Limit widthinput to 5 digits
    if (ratioinput.checked) {
        height = widthinput.value / orgimageratio;
       
    } else {
        height = heightinput.value;
      
    }
    heightinput.value = height;
    limitValue(heightinput); // Limit heightinput to 5 digits
});

heightinput.addEventListener("keyup", () => {
    let width;
    limitValue(heightinput); // Limit heightinput to 5 digits
    if (ratioinput.checked) {
        width = heightinput.value * orgimageratio;
    } else {
        width = widthinput.value;
    }
    widthinput.value = width;
    limitValue(widthinput); // Limit widthinput to 5 digits
});

fileinput.addEventListener("change", loadfile);
uploadbox.addEventListener("click", () => {
    fileinput.click();
});

const resizeanddownload =()=>{
    const canvas =document.createElement("canvas");
    const a = document.createElement("a");
    const ctx =canvas.getContext("2d");

    let imagequality ;
       if(qualityinput.checked)
       {
        imagequality = 0.7;

       }
       else{imagequality=1.0}
//  const imagequality = qualityinput.checked? 0.7 :1.0;
    

    canvas.width =widthinput.value;
    canvas.height =heightinput.value;

    ctx.drawImage(previewimg, 0, 0 ,canvas.width,canvas.height);
    // document.body.appendChild(canvas);
   
    a.href =canvas.toDataURL("image/jpeg" ,imagequality);
    a.download =new Date().getTime();
    a.click();
}

downloadbtn.addEventListener("click",resizeanddownload);




