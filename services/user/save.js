const savePersonToPublicFolder = async (db, { email, password }) => {
    if (!email || !password)  return Error("Email and password should be present");
    
    const users = db.read();

    const error = await db.save({
        ...users,
        [email]: password
    });

    return error;
}

module.exports = savePersonToPublicFolder;