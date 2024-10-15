import { dataObj } from "src/app/types"

export const APP_COLORS = {
    GRASS: '#283F3B',
    GRASS_LIGHT: '#556F44',
    INDIGO: '#053C5E',
    TEAL: '#1F7A8C',
    CHARCOAL: '#212121',
    GRAY: '#2F2F2F',
    CLEAR: '#F8F6F4'
}

export const contactEmailTemplate = (data: dataObj) => {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Tienes un nuevo mensaje</title>
            <style type="text/css">
                body {
                    margin: 0;
                    padding: 0;
                    width: 100% !important;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                    font-family: Arial, sans-serif;
                }

                table {
                    border-collapse: collapse;
                }

                img {
                    border: 0;
                    outline: none;
                    text-decoration: none;
                    display: block;
                }

                a {
                    color: #3b6a99 !important;
                    text-decoration: none;
                }

                a:hover {
                    text-decoration: underline;
                }

                .content {
                    width: 100%;
                    max-width: 800px;
                    margin: 0 auto;
                    border-radius: 4px;
                }

                .header {
                    background-color: #283F3B;
                    color: #F8F6F4;
                    padding: 10px 20px;
                    text-align: center;
                    border-bottom-left-radius: 20px;
                    border-bottom-right-radius: 20px;
                    width: 100%;  /* Add this line to ensure the header takes full width */
                    box-sizing: border-box;
                    margin-bottom: 20px;
                }

                .header h1 {
                    margin: .5rem;
                }
                
                .message {
                    padding: 2rem 0;    
                }
                
                .footer {
                    background-color: #F8F6F4;
                    color: #333;
                    padding: 10px 20px;
                    text-align: center;
                    font-size: 12px;
                    border-top-left-radius: 20px;
                    border-top-right-radius: 20px;
                    width: 100%;
                }
            </style>
        </head>

        <body>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td align="center">
                        <table class="content" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td class="header" colspan="2">
                                    <h1>Hola Yei</h1>
                                    <span><p>Alguien te escribió desde la web</p></span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="message">
                                    <p><strong>De: </strong>${data.name} ${data.email ? '(' + data.email + ')' : ''}</p>
                                    <p><strong>Mensaje: </strong>${data.message}</p>
                                </td>
                            </tr>
                            <tr>
                                <td class="footer" colspan="2">
                                    <p>&copy; 2024 YMG Consultancy</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    </html>
    `
}