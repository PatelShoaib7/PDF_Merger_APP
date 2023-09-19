

const sendResponse =async (req, res  , errCode , Msg , errMsg)=>{
    // req, 
    // res , 
    // 200,
    // "Hellow World !" ,
    // [{Sucess :"Yes You Got It !"}] 

    res.status(errCode).send({
        Msg ,
        errMsg ,
    })
}

module.exports = {
    sendResponse : sendResponse
}