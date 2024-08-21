import 'bootstrap/dist/css/bootstrap.css';
import './../index.css';
import '../style/style';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    let bootstrapScript = '';
    if (process.env.NODE_ENV === 'development') {
        bootstrapScript = '/assets/bootstrap.bundle.js';
    } else {
        bootstrapScript = '/assets/bootstrap.bundle.min.js';
    }

    return (
        <html lang='en'>
            <head>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' />
                <link
                    href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
                    rel='stylesheet'
                />
                <link
                    href='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
                    rel='stylesheet'
                />
                <script src={bootstrapScript} async={true} />
            </head>
            <body>
                <div className='container-fluid'>{children}</div>
            </body>
        </html>
    );
}
