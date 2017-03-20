var TaskApi = {
    init: function(){
        if(!localStorage.getItem('tasks'))
        {
            localStorage.setItem('tasks', JSON.stringify([
                { id: 1, name: "Buy mountain bike", description: "The goal of this task is for you to have your own bike", priorityId: 1, statusId: 3, isEditable: false },
                { id: 2, name: "Buy car", description: "The goal of this task is for you to have your own car", priorityId: 1, statusId: 1, isEditable: false },
                { id: 3, name: "Buy condominium", description: "The goal of this task is for you to have your own condo", priorityId: 2, statusId: 3, isEditable: false },
                { id: 4, name: "Buy house and lot", description: "The goal of this task is for you to have a place for the entire family", priorityId: 3, statusId: 1, isEditable: false },
                { id: 5, name: "Buy restaurant", description: "The goal of this task is for you to have your own business", priorityId: 3, statusId: 1, isEditable: false },
                { id: 6, name: "Buy company", description: "The goal of this task is for you to have your own life", priorityId: 2, statusId: 2, isEditable: false }
                //Add items here, then click 'Refresh' to reload localStorage
            ]));
        }
    },
    getItems: function(){
        if(!localStorage.getItem('tasks'))
        {
            this.init();
        }

        return localStorage.getItem('tasks');
    },
    setItems: function(tasks){
        localStorage.setItem('tasks', JSON.stringify(tasks));
    },
    refreshData: function(){
        localStorage.clear();
        this.init();
    }
};

module.exports = TaskApi;