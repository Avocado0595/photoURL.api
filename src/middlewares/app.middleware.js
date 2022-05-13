import express from "express";
import cors from 'cors';
function initMiddleware(app){
    app.use(express.json());
    app.use(express.urlencoded({extended: true, limit: '30mb'}))
    app.use(cors());
    app.use(express.static('public'))
}
export {initMiddleware}