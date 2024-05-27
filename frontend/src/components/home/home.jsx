import Header from '../header/header';
import './style.css'

function home() {
    return (
        <>
            <Header user={localStorage.getItem('user')} />
            <div className='banner'>
                <h1>Bem-vindo ao seu aplicativo de controle de gastos!</h1>
                <div className="text-center">
                    <p>Aqui você pode gerenciar suas despesas de forma simples e eficiente.</p>
                    <p>Para começar, faça <a href='/login' className='text-button'>login</a> na sua conta ou <a href='/login' className='text-button'>registre-se</a> se ainda não tem uma.</p>
                    <p>Lembre-se de que você pode adicionar despesas na aba `Adicionar Despesa` e visualizar todas elas na aba `Gastos`.</p>
                    <p>Para qualquer dúvida, entre em contato conosco pelo e-mail julio@rugolo.dev.</p>
                </div>
            </div>
        </>
    );
}

export default home;