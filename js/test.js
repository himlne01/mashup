/* jshint esversion: 8 */
/* jshint node: true */
/* jshint jquery: true */
/* jshint browser: true */
'use strict';

import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";

// function formation() {
    console.log("hello lah");
    const key = '6aac1e30b99b4034abd92a7fcf4a18e5';
    const endpoint = `https://one-interpretation.cognitiveservices.azure.com/`;

    const textAnalyticsClient = new TextAnalyticsClient(new AzureKeyCredential(key), endpoint);
    sentimentAnalysis(textAnalyticsClient);
//}

async function sentimentAnalysis(client){

    //const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");
    //require("dotenv").config();

    // const key = '6aac1e30b99b4034abd92a7fcf4a18e5';
    // const endpoint = `https://one-interpretation.cognitiveservices.azure.com/`;

    // const textAnalyticsClient = new TextAnalyticsClient(new AzureKeyCredential(key), endpoint);

    const sentimentInput = [
        // interp(lines)
        "Two roads diverged in a yellow wood and sorry i could not travel both and be one traveller long i stood and looked down one as far as i could to where it bent in the undergrowth. then took the other, just as fair, and having perhaps the better claim. because it was grassy and wanted wear but as for that the passing there had really worn them about the same."
    ];
    const sentimentResult = await client.analyzeSentiment(sentimentInput);

    sentimentResult.forEach(document => {
        console.log(`ID: ${document.id}`);
        console.log(`\tDocument Sentiment: ${document.sentiment}`);
        console.log(`\tDocument Scores:`);
        console.log(`\t\tPositive: ${document.confidenceScores.positive.toFixed(2)} \tNegative: ${document.confidenceScores.negative.toFixed(2)} \tNeutral: ${document.confidenceScores.neutral.toFixed(2)}`);
        // console.log(`\tSentences Sentiment(${document.sentences.length}):`);
        // document.sentences.forEach(sentence => {
        //     console.log(`\t\tSentence sentiment: ${sentence.sentiment}`)
        //     console.log(`\t\tSentences Scores:`);
        //     console.log(`\t\tPositive: ${sentence.confidenceScores.positive.toFixed(2)} \tNegative: ${sentence.confidenceScores.negative.toFixed(2)} \tNeutral: ${sentence.confidenceScores.neutral.toFixed(2)}`);
        // });
    });
}
/*
function interp(lines) {
    let hugePara = '';
    for (let ls in lines) {
        hugePara += (lines[ls] + '');
    }
    return hugePara;
    // console.log(hugePara);
}*/