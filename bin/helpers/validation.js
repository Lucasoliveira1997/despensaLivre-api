'use strict'

const mongoose = require('mongoose')

class ValidationContract {
    constructor() {
        this._errors = []
    }

    isNotObjectId(objectId, message) {
        if (objectId == false)
            this._errors.push({ message: message })
    }

    isNotArrayOrEmpty(value, message) {
        if (!value && value.length == 0)
            this._errors.push({ message: message })
    }
    isTrue(value, message) {
        if (value)
            this._errors.push({ message: message })
    }

    isRequired(value, message) {
        if (!value || value.length <= 0)
            this._errors.push({ message: message })
    }

    hasMinLen(value, min, message) {
        if (!value || value.length < min)
            this._errors.push({ message: message })
    }

    hasMaxLen(value, max, message) {
        if (!value || value.length > max)
            this._errors.push({ message: message })
    }

    isFixedLen(value, len, message) {
        if (value.length != len)
            this._errors.push({ message: message })
    }

    isEmail(value, message) {
        var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
        if (!reg.test(value))
            this._errors.push({ message: message })
    }

    errors() {
        return this._errors
    }

    clear() {
        this._errors = []
    }

    isValid() {
        return this._errors.length == 0
    }

    isCpf(cpf, message) {
        let sum, rest

        if (cpf == undefined || cpf.trim().length === 0 || cpf === "00000000000") {
            return this._errors.push({ message: message })
        }
        cpf = cpf.replace('.', '').replace('.', '').replace('-', '')

        sum = 0
        for (let i = 1; i <= 9; i++) {
            sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i)
        }
        rest = (sum * 10) % 11

        if ((rest === 10) || (rest === 11)) {
            rest = 0
        }
        if (rest !== parseInt(cpf.substring(9, 10))) {
            return this._errors.push({ message: message })
        }

        sum = 0
        for (let i = 1; i <= 10; i++) {
            sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i)
        }
        rest = (sum * 10) % 11

        if ((rest === 10) || (rest === 11)) {
            rest = 0
        }
        if (rest !== parseInt(cpf.substring(10, 11))) {
            return this._errors.push({ message: message })
        }
        return true
    }
}

module.exports = new ValidationContract
