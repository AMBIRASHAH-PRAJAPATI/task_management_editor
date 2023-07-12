// json file
fetch('DT.json')
  .then(response => response.json())
  .then(jsonData => {
    // Get the relevant assets from the JSON data
    const assets = jsonData.tasks[0].assets.filter(
      asset => asset.asset_id === 18883 ||
                asset.asset_id === 18884 ||
                asset.asset_id === 18885 ||
                asset.asset_id === 18886
    );

    // Get the HTML elements for each box
    const graybgdischeading = document.querySelector('.graybgdisc h3');
    const graybgdiscdiscirption = document.querySelector('.graybgdisc p');
    const box1Heading = document.querySelector('.boxheading h4');
    const box1Description = document.querySelector('.boxdiscription p');
    const box2Heading = document.querySelector('.box:nth-child(2) .boxheading h4');
    const box2Description = document.querySelector('.box:nth-child(2) .boxdiscription p');
    const box3Heading = document.querySelector('.box:nth-child(3) .boxheading h4');
    const box3Description = document.querySelector('.box:nth-child(3) .boxdiscription p');
    const box4Heading = document.querySelector('.box:nth-child(4) .boxheading h4');
    const box4Description = document.querySelector('.box:nth-child(4) .boxdiscription p');

    // Set the asset titles and descriptions into the HTML components
    graybgdischeading.textContent = jsonData.tasks[0].task_title;
    graybgdiscdiscirption.textContent = jsonData.tasks[0].task_description;
    box1Heading.textContent = assets[0].asset_title;
    box1Description.textContent = assets[0].asset_description;
    box2Heading.textContent = assets[1].asset_title;
    box2Description.textContent = assets[1].asset_description;
    box3Heading.textContent = assets[2].asset_title;
    box3Description.textContent = assets[2].asset_description;
    box4Heading.textContent = assets[3].asset_title;
    box4Description.textContent = assets[3].asset_description;
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });





// submit btn

let submittask = document.getElementById("submittask");
submittask.addEventListener("click",()=>{
    let a = prompt("do u realy want to submit task/ptoject");
    let submitmsg=()=>{
        alert("your task/project is submitted");
        submittask.style.display = "none";
    }
    if(a==="yes" || a==="YES" || a==="y" || a==="Y")
        setTimeout(submitmsg,3000)
    else 
    setTimeout(alert("your task/project is not submitted, Try again"))
    
})



// accordian

let accordionBox = document.querySelectorAll(".b42accordion");

accordionBox.forEach(item => {
 
  let updown = item.querySelector(".updown");

  updown.addEventListener("click", () => {
    let currentHeight = "37px";

    if (item.style.height !== currentHeight) {
      item.style.height = currentHeight;
      updown.style.transform = "rotate(180deg)";
    } else {
      item.style.height = "auto";
      updown.style.transform = "rotate(0deg)";
    }
  });
});




// see more

let accbody = document.querySelectorAll(".accbody")
accbody.forEach(item=>{

    let seemore = item.querySelector(".seemore");
    seemore.addEventListener("click", ()=>{
        let accbodydata = item.querySelector(".accbodydata");
        let acdatamax_height = window.getComputedStyle(document.getElementsByClassName("accbodydata")[0]).maxHeight;
        console.log(acdatamax_height);

        if (accbodydata.style.maxHeight !="inherit") {
            accbodydata.style.maxHeight = "inherit";
        }
        else {
            accbodydata.style.maxHeight = acdatamax_height;
        }
    });

});



// add sub thred template


  let b2threadbody = document.querySelectorAll(".b2threadbody");
  b2threadbody.forEach(element => {

   let addsub =  element.querySelector(".addsub");
    addsub.addEventListener("click", () => {

        let temp = document.getElementById("sub_temp");
        let clon = temp.content.cloneNode(true);
        let subthredboxcontainer = element.querySelector(".subthredboxcontainer");
        subthredboxcontainer.appendChild(clon);
        console.log(subthredboxcontainer);

    });
        
  });



// add new Thred template

let newthredbox = document.getElementById("newthredbox");
let addthreadbtn = document.getElementById("addthreadbtn");

let addthredfn = ()=>{
    let temp = document.getElementById("thred_temp");
    let clon = temp.content.cloneNode(true);
    newthredbox.appendChild(clon);
}

addthreadbtn.addEventListener("click",()=>{
    addthredfn();
});


// remove new thred

let removethredbtn = document.getElementById("removethredbtn");

let removethredfn = ()=>{
    let newthred =  document.querySelectorAll("#newthredbox .b42accordion");
    let itemno = newthred.length - 1 ;
    newthred[itemno].remove();
   document.getElementsByClassName("boxcontent")[1].scrollTop =0;
}

removethredbtn.addEventListener("click", ()=>{
    removethredfn();
})


// editor 

// edit function

const doeditfn = (command, value) => {
    if (command === 'createLink' || command === 'insertImage') {
        let url = prompt("Enter link here to add", "http://");
        document.execCommand(command, false, url);
 
    } else {
        document.execCommand('styleWithCSS', false, true); 
        document.execCommand(command, false, value);
    }
};
// file save
const savefilefun = command=>{
    let complexoutput = document.getElementById("complexoutput");
    if(command === "newile") complexoutput.innerHTML =" ";
    else if(command==='print'){
        const printWindow = window.open("");
           printWindow.document.write(complexoutput.innerHTML);
           printWindow.document.close();
           printWindow.print();
    }else{
        const filename = prompt("Enter file Name","document");
        if(command==='savetxt'){
            const blob = new Blob([complexoutput.innerText])
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a');
            link.href = url;
            link.download = `${filename}.txt`;
            link.click();
        }else html2pdf().from(complexoutput).save(filename);
   
    }
}

// On clicking options
let editoptions = document.querySelectorAll(".insideci li");
editoptions.forEach( (op,index) =>{
    if (index < 4) {
        op.addEventListener("click",()=>{
            console.log("Zszc");
            let command = op.dataset['element'];
            console.log(command);
            savefilefun(command);
            console.log("end");
        });
        return; // Skip the first three elements
      }
    op.addEventListener("click",()=>{
        let command = op.dataset['element'];
        doeditfn(command, null);
    });
});


// On clicking btns
let editbtn = document.querySelectorAll(".editbtn");
editbtn.forEach(btn => {
    btn.addEventListener("click", () => {
        let command = btn.dataset['element'];
        doeditfn(command, null);
    });
});

// select one 
let selectElement = document.querySelector("[name='formateofedit']");
selectElement.addEventListener("change", () => {
    let selectedValue = selectElement.value;
    let command = selectElement.dataset['element'];
    doeditfn(command, selectedValue);
});





// notice board

let openclosenoticefn = ()=>{
    
    let noticebody = document.getElementById("noticebody");
    if(opennotice.classList.contains("closenotice")){
        opennotice.classList.remove("closenotice");
        noticebody.classList.remove("active");
    }
    else{
        opennotice.classList.add("closenotice");
        noticebody.classList.add("active")
    }
}

let opennotice= document.getElementById("opennotice");
opennotice.addEventListener("click", ()=>{
    openclosenoticefn();
});


// journey board

let openclosejourneyfun = ()=>{
    let jrpointsbox = document.getElementById("jrpointsbox");
    let jrheading = document.getElementById("jrheading");

    if(jrbdbtn.style.display==="none"){
        jrbdbtn.style.display="flex";
        jrpointsbox.style.width = "0px";
        jrpointsbox.style.padding = "0px";
        jrheading.style.display="none";
        openclosejourney.style.transform ="rotate(0deg)"
    }
    else{
        jrbdbtn.style.display="none";
        jrpointsbox.style.width = "250px";
        jrpointsbox.style.padding = " 30px 20px";
        jrheading.style.display="inline";
        openclosejourney.style.transform ="rotate(180deg)"
    }

}

let jrbdbtn = document.getElementById("jr1b");
let openclosejourney = document.getElementById("openclosejourney");

openclosejourney.addEventListener("click", ()=>{
    openclosejourneyfun();
});


//  ? mark function model 

let faqcontainer = document.getElementById("faqcontainer");
let que = document.getElementById("que?");
let closefaq = document.getElementById("closefaq");
let faqmodel = document.getElementById("faqmodel");

que.addEventListener("click", () => {
        faqcontainer.style.visibility ="visible";
        faqmodel.classList.toggle("faqboxx");
        document.body.style.overflow = 'hidden';
});

closefaq.addEventListener("click", ()=>{
    faqcontainer.style.visibility ="hidden";
    faqmodel.classList.remove("faqboxx");
    document.body.style.overflow = 'auto';
});



// save as pdf

// import html2canvas from 'html2canvas';





















//   remove that sub thred 

// let removetsubfun = (i) => {
//     let thatsub = document.getElementsByClassName("subthredbox");
//     let thatremovebtn = document.getElementsByClassName("removesub");

//     console.log(thatsub);
//     console.log("2st step");
//     console.log(thatremovebtn);

//    let k=i+1;
//     console.log(k);

//     thatsub[k].parentNode.removeChild(thatsub[k]);
//   thatremovebtn[k].parentNode.removeChild(thatremovebtn[k]);
// }

//   for (let i = 0; i < removesubbtn.length; i++) {
//     removesubbtn[i].addEventListener("click", () => {
        
//         console.log("1st step");
//         console.log(i);

//       removetsubfun(i);

//       console.log("last step");
//     });

//   }

