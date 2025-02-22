const express = require('express');
const { generateRandomWord, isValidURL } = require('../util');
const { Shorten } = require('../models/shorten');
const e = require('express');
const router = express.Router();

router.post('/shorten', async (req, res) => {
    const {url} = req.body;

    if(!url) {
        return res.status(400).json({"error": "Please provide url!"})
    }

    if(!isValidURL(url)) {
        return res.status(400).json({"error": "Invalid URL"})
    }
    try {
        let isExist = true
        let shortCode = ""

        // For Generating unique shortCode
        while(isExist) {
            shortCode = generateRandomWord();
            const existingShorten = await Shorten.findOne({where: {shortCode: shortCode}})
            if(!existingShorten) {
                isExist = false
            }
        }
        
        const shorten = await Shorten.create({
            url, shortCode
        })
        await shorten.save();
        return res.status(201).json({
            message: "Url is saved successfully!",
            shorten
        })
    }catch (err) {
        return res.status(500).json({error: err.message})
    }
})

router.put('/shorten/:shortCode', async (req, res) => {
    const {url} = req.body;
    const shortCode = req.params.shortCode

    if(!url) {
        return res.status(400).json({"error": "Please provide url!"})
    }

    try {
        // Find Shorten with shortCode
        const shorten = await Shorten.findOne({where: {shortCode: shortCode}})
        if(!shorten) {
            return res.status(404).json({"error": "URL not found!"})
        }

        // Update data
        shorten.set({url})
        await shorten.save();

        return res.status(200).json({
            message: "Url is updated successfully!",
            shorten
        })
    }catch (err) {
        return res.status(500).json({error: err.message})
    }
})

router.get('/shorten/:shortCode', async (req,res) => {
    const shortCode = req.params.shortCode;
    const shorten = await Shorten.findOne({where: {shortCode}})
    if(!shorten) {
        return res.status(400).json({error: "URL Record not found."})
    }

    res.status(200).json({
        shorten
    })
})

router.get('/shorten/:shortCode/stats', async (req,res) => {
    const shortCode = req.params.shortCode;
    const shorten = await Shorten.findOne({where: {shortCode}})
    if(!shorten) {
        return res.status(400).json({error: "URL Record not found."})
    }

    res.status(200).json({
        shorten
    })
})

router.delete('/shorten/:shortCode', async (req,res) => {
    const shortCode = req.params.shortCode;
    try{
        const result = await Shorten.destroy({where: {shortCode: shortCode}})
        if(result == 0) {
            return res.status(404).json({error: `No record found with shortCode ${shortCode}`})
        }else{
            return res.status(204).json({message: `Record with shortCode ${shortCode} deleted successfully!`})
        }
    }catch(err) {
        return res.status(500).json({error: err.message})
    }
})


router.get('/:shortCode', async (req,res) => {
    const shortCode = req.params.shortCode;
    const shorten = await Shorten.findOne({where: {shortCode}})

    if(!shorten) {
        return res.status(404).json({error: "URL Record not found."})
    }

    const originalUrl = shorten.url;
    shorten.set({accessCount: shorten.accessCount+1})
    await shorten.save()

    res.redirect(301, originalUrl);
})



module.exports = {router}