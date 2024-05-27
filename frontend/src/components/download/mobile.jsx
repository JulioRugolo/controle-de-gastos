const MobileDownload = () => {
  return (
    <div className="download-container">
      <h2>Adicionar à Tela Inicial</h2>
      <p>Siga as instruções abaixo para adicionar o webapp à tela inicial do seu dispositivo.</p>
      <h3>iPhone</h3>
      <ol>
        <li>Abra o Safari e acesse a URL do nosso webapp.</li>
        <li>Toque no ícone de compartilhamento na parte inferior da tela.</li>
        <li>Selecione &quot;Adicionar à Tela de Início&quot;.</li>
        <li>Toque em &quot;Adicionar&quot; no canto superior direito.</li>
      </ol>
      <p>____________________________________</p>
      <h3>Android</h3>
      <ol>
        <li>Abra o Chrome e acesse a URL do nosso webapp.</li>
        <li>Toque no menu de três pontos no canto superior direito.</li>
        <li>Selecione &quot;Adicionar à tela inicial&quot;.</li>
        <li>Toque em &quot;Adicionar&quot; na janela pop-up.</li>
      </ol>
    </div>
  );
};

export default MobileDownload;
