var exec = require("child_process").exec;

exec("make < easy.in", (err, stdout) => {
    if (err) {
        throw err;
    }

    console.log(stdout);
});