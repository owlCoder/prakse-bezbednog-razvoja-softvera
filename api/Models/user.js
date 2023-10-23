// Model of user document in collection of users
class User {
    constructor(uid, firstName, lastName, email, dateBirth, lastAccessDate, photoBase64) {
        (this.uid = uid),
        (this.firstName = firstName),
        (this.lastName = lastName),
        (this.email = email),
        (this.dateBirth = dateBirth),
        (this.lastAccessDate = lastAccessDate),
        (this.photoBase64 = photoBase64)
    }
}

export default User;