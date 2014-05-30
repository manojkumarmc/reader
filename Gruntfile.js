module.exports = function(grunt){

    grunt.registerTask('default', ['sed']);

    grunt.loadNpmTasks('grunt-sed');

    grunt.initConfig({
        // get the list of tasks
        tasks: grunt.file.readJSON('./data/tasks.json'),

        sed: {
            injectTasks : {
                path : './client/js/ctrl-dnd.js',
                pattern: 'TASKLIST',
                replacement: '<%= JSON.stringify(tasks) %>',
                recursive: false
            }
        }

    });
};
