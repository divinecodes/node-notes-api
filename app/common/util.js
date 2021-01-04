const crypto = require('crypto'); 


/**
 * hashes a specific string and return the salt and hash
 * 
 * @param {string} str
 * @return {string} 
 */
exports.hashString = (str) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt)
                    .update(str)
                    .digest('base64');
    
    return `${salt}$${hash}`;
}