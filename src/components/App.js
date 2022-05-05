import { Layout } from 'antd';
import TopBar from './TopBar';
import Main from './Main';


const { Footer, Content } = Layout;

function App() {
  return (
    <Layout>
      
          <TopBar/>
      
      <Content className='content'>
          <Main/>
      </Content>

      {/* <Footer>Footer</Footer> */}
    </Layout>
  );
}

export default App;
