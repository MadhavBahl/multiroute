var exec = require("child_process").exec;

exec("ls", (err, stdout) => {
    if (err) {
        throw err;
    }

    console.log(stdout);
});