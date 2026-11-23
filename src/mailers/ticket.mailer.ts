export function ticketCreated(id:string){
    return `
        <h1>Hello, Welcome to CRM App</h1>
        <p>Your ticket with id: <strong>${id}</strong> has been created.</p>
        <br/>
        <p>You can expect a reply from us soon</p>

        <img src="${"https://i.imgur.com/WC9esPd.gif"}"/>

        <p>Thanks & regards</p>
    `;
}