export function jiraIssueMapper(data) {
    const ticket = data.ticket;
    return {
        fields: {
            project: {
                "id": projectType[data.ticket.project]
            },
            summary: ticket.summary,
            description: ticket.description,
            issuetype: {
                "id": issueType[data.ticket.issueType]
            },
            priority: {
                "id":   priorityType[data.ticket.priority]
            },
            customfield_15151: ticket.expectedBehavior,
            customfield_15140: ticket.actualBehavior,
            customfield_15160: ticket.recreationSteps,
            customfield_15155: 10,
            customfield_15175: ticket.date,
            customfield_15255: {
                value: "Cloud 2.0",
                child: {
                    value: "Firm Settings"
                }
            }
        }
    };
}

const projectType = {
    Distributors: 14261
};

const issueType = {
    Issue: 32,
    Request: 11307,
    Question: 8
};

const priorityType = {
    Trivial: '5',
    Minor: '4',
    Critical: '2',
    Blocker: '1',
    Emergency: '10300'
};
