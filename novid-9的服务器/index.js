const express = require('express')
const axios = require('axios')
const app = express()
app.use('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})
const router = express.Router()

app.use('/api', router)

router.get('/list', async (req, res) => {
    const result = await axios.post(
        'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=localCityNCOVDataList,diseaseh5Shelf'
    )
    res.json({
        ...result.data.data,
    })
})

app.listen(8080,() => {
    console.log('success server')
})
