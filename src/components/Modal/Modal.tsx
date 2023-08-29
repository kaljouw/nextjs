type Props = {
    children: JSX.Element,
};

export const Modal = ({ children }: Props) => <div className='Modal'>
    {children}
</div>;