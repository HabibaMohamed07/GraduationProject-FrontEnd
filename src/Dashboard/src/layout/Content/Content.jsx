import "./Content.css";
import ContentTop from '../../components/ContentTop/ContentTop';
import ContentMain from '../../components/ContentMain/ContentMain';

const Content = ({user,role}) => {
  console.log("Content User:",user)
  return (
    <div className='main-content'>
      <ContentTop />
      <ContentMain user ={user} role={role} />
    </div>
  )
}

export default Content
