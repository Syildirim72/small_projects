import React from 'react';

export default class TodosListItem extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isEditing: false
        };
    }

    renderTaskSection(){
        const { task, isCompleted } = this.props;
console.log(this.props);
        const taskStyle = {
            color: isCompleted? 'green': 'red',
            cursor: 'pointer'
        };

        if (this.state.isEditing){
            return (
                <td>
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <input type="text" defaultValue={task} ref="editInput" />
                    </form>
                </td>
            );
        }

        return(
            <td 
                style = {taskStyle}
                onClick={this.props.toggleTask.bind(this, task)}
            >
                {task}
            </td>
        );
    }

    renderActionsSection() {
        if (this.state.isEditing) {
            return (
                <td>
                    <button onClick={this.onCancelClick.bind(this)} >cancel</button>
                    <button onClick={this.onSaveClick.bind(this)}>save</button>
                </td>
            );
        }
            return(
                <td>
                    <button onClick={this.onEditClick.bind(this)}>edit</button>
                    <button onClick={this.props.deleteTask.bind(this, this.props.task)}>del</button>
                </td>
        );
    }


    render (){
        return(
                <tr>
                   {this.renderActionsSection()}
                    {this.renderTaskSection()}
                </tr>

        );
    }

    onEditClick(){
        this.setState({ isEditing: true});
    }

    onCancelClick(){
        this.setState({ isEditing: false});
    }

    onSaveClick(event) {
        event.preventDefault();
        
        const oldTask = this.props.task;
        const newTask = this.refs.editInput.value;
        this.props.saveTask(oldTask, newTask);
        this.setState({ isEditing: false});
    }
}
        