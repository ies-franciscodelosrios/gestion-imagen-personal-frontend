// ** React Imports
import { useContext } from 'react';

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap';

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors';

// ** Components
import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal';
import Cardfp from '@src/views/ui-elements/cards/basic/Card-fp';
import CardUserTimeline from '@src/views/ui-elements/cards/advance/CardUserTimeline';
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard';

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss';
import '@styles/base/pages/dashboard-ecommerce.scss';



const EcommerceDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors);

  // ** vars
  const trackBgColor = '#e9ecef';

  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col xl="4" md="6" xs="12">
          <CardMedal />
        </Col>
        <Col xl="8" md="6" xs="12">
          <StatsCard cols={{ xl: '3', sm: '6' }} stats={JSON.parse(localStorage.getItem('stadistics')) ?? {}}/>
        </Col>
      </Row>

      <Row className="match-height">
        <Col lg="4" md="12">
          <CardUserTimeline/>
          
        </Col>
        <Col lg="8" md="12">
            <Cardfp />
        </Col>
      </Row>

      
    </div>
  );
};

export default EcommerceDashboard;
