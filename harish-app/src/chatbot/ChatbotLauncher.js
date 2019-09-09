import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatBot from 'react-simple-chatbot';

export class ChatbotLauncher extends Component {


    render() {
        const steps = [
            {
                id: '1',
                message: 'What is your name?',
                trigger: '2',
            },
            {
                id: '2',
                user: true,
                trigger: '3',
            },
            {
                id: '3',
                message: 'Hi {previousValue}, nice to meet you!',
                end: true,
            }
        ];
        return (
            <ChatBot steps={steps} />
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ChatbotLauncher)
