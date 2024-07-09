// Test middleware: send a message "Hello from testMiddleware" to the console
export const testMiddleware = (req, res, next) => {
    console.log("👻 Hello from testMiddleware");
    next();
}