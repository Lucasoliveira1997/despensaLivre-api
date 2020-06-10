'use strict'


module.exports = (validation, resp) => {
    if(!validation.isValid()) {
       return resp.status(400).send(
            {validation: validation.errors()}
        )
    } else {
        return resp.status(200)
    }
}
