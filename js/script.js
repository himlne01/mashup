/* jshint esversion: 8 */
/* jshint node: true */
/* jshint jquery: true */
/* jshint browser: true */
'use strict';


async function getData(url) {
	return fetch(url)
		.then(response => response.json())
		.catch(error => console.log(error));
}

async function getPoem() {
    let theTextbox = document.getElementById("poemLine");
    let theLines = theTextbox.value;
    theTextbox.value = ''; // CLEAR TEXTBOX
    let thePoemData = await getData("http://poetrydb.org/lines/" + theLines);
    let theRow = document.querySelector(".row");
    theRow.removeAttribute("p");
    let child = document.querySelector(".poemParas"); // CLEAR POEM DIV
    while (child) {
        theRow.removeChild(child);
        child = document.querySelector(".poemParas");
    }
    if (thePoemData.status == "404") { // WARNING
        let po = document.querySelector("#noPoem");
        po.setAttribute("class", "alert alert-danger");
        po.innerHTML = "We cannot find a poem with those lines";
    }
    else {
        let po = document.querySelector("#noPoem");
        po.innerHTML = ''; // CLEAR WARNING DIV
        po.removeAttribute("class");
        // Random Poem Number
        let randomNumber = Math.floor(Math.random() * (thePoemData.length + 1));
        // Title and Author
        let theTitle = thePoemData[randomNumber].title;
        let theAuthor = thePoemData[randomNumber].author;
        let firstEl = document.createElement("h3");
        firstEl.setAttribute("class", "poemParas");
        firstEl.innerHTML = theTitle + " by " + theAuthor;
        theRow.appendChild(firstEl);
        // Lines
        for (let ls in thePoemData[randomNumber].lines) {
            let secondEl = document.createElement("p");
            secondEl.setAttribute("class", "poemParas");
            let firstText = document.createTextNode(thePoemData[randomNumber].lines[ls]);
            secondEl.appendChild(firstText);
            theRow.appendChild(secondEl);
        }
        // Get the Sentiment Analysis Interpretation
        // sentimentAnalysis(thePoemData[randomNumber].lines, textAnalyticsClient);

        if (randomNumber != 0) {
            randomNumber = Math.floor(Math.random() * (1085));
        } 
        
        let thePhotoData = await getData("https://picsum.photos/id/"+randomNumber+"/info");
        let thePicCol = document.querySelector(".pic");
        // let thePic = document.createElement(a);
        let thePicc = document.createElement(img);
        // thePic.setAttribute("href", thePhotoData.download_url);
        thePicc.setAttribute("src", thePhotoData.download_url+".jpg");
        thePicCol.appendChild(thePicc);
        thePoemData = ''; // CLEAR POEM DATA
    }
}
