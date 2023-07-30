import React, { useState } from 'react';
import { Layout, Input } from 'antd';
import Cards from "./Cards";
import logo from "./matchMovieLogo.jpg";


const { Header, Content } = Layout;
const App = () =>{ 
  const [search, setSearch] = useState("");
  return(
  <Layout>
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="Logo da empresa"
          style={{ height: "50px" }}
        />
        <Input.Search
          placeholder="Pesquisar"
          onSearch={(e) => setSearch(e)}
          style={{ width: "100%", maxWidth: 200, margin: "16px 24px" }}
          allowClear
          enterButton
        />
      </div>
    </Header>
    <Content style={{ marginTop: 64, padding: "0 50px" }}>
      <Cards search={search} />
    </Content>
  </Layout>
)};

export default App;
