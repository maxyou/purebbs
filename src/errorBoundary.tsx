import * as React from 'react'

interface IProps{
    children: any,
}
interface IState{
    error: any,
    errorInfo: any
}

class ErrorBoundary extends React.Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        // this.state:{error:any, errorInfo: any} = { error: null, errorInfo: null };
    }
    state:{error:any, errorInfo: any} = { error: null, errorInfo: null };

    componentDidCatch(error:any, errorInfo:any) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
    }

    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}
export default ErrorBoundary

