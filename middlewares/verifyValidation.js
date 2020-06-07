'use strict'

module.exports = (validation, resp) => {
    if(!validation.isValid()) {
        resp.status(400).send(
            {validation: validation.errors()}
        ).end
        return
    }
}