// Define a core name-spaced IIFE
const Core = Core || {};

(function(namespace) {
    // Define the User class
    class User {
        constructor(displayName, emailAddress, username, password) {
            this.DisplayName = displayName;
            this.EmailAddress = emailAddress;
            this.Username = username;
            this.Password = password;
        }

        // Getters and setters for DisplayName, EmailAddress, and Username
        get DisplayName() {
            return this.DisplayName;
        }

        set DisplayName(value) {
            this.DisplayName = value;
        }

        get EmailAddress() {
            return this.EmailAddress;
        }

        set EmailAddress(value) {
            this.EmailAddress = value;
        }

        get Username() {
            return this.Username;
        }

        set Username(value) {
            this.Username = value;
        }
        
        get Password() {
            return this.Password;
        }

        set Password(value) {
            this.Password = value;
        }

        // Overridden toString() method to output the User's display name
        toString() {
            return this.DisplayName;
        }

        // Utility methods for converting a User to/from JSON format
        toJSON() {
            return {
                "DisplayName" : this.DisplayName,
                "EmailAddress" : this.EmailAddress,
                "Username" : this.Username, 
                "Password" : this.Password
            };
        }

        
         fromJSON(data) {
             this.DisplayName = data.displayName;
             this.EmailAddress = data.emailAddress;
             this.Username = data.username;
             this.Password = data.password;
        }

        // Serialize and deserialize functions for the User class
        serialize() {
            return JSON.stringify(this.toJSON());
        }

        static deserialize(jsonString) {
            const data = JSON.parse(jsonString);
            return User.fromJSON(data);
        }

        static fromJSON(data) {
            return undefined;
        }
    }

    // Expose the User class to the namespace
    namespace.User = User;
})(Core);
