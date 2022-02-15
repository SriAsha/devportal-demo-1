import * as React from 'react';
import styled from 'styled-components';

import{APIGEE_PROXY_URL} from '@redocly/developer-portal/apigee';

import { getIdPJwt } from '@redocly/developer-portal/ui';

export function Configuration() {
  const GROUP_ID = '415bd98a-c971-4873-81ed-aa30bec19e38';
  const idpIdToken = getIdPJwt();

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {

    run();
    
    async function run() {
      setLoading(true);
      const url = APIGEE_PROXY_URL + '/groups/' + GROUP_ID +'/configs';
      const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' ,
            "jwt-token": idpIdToken
        },
        body: JSON.stringify({
            "key": "portal-config1",
            "description": "testconfig-portal",
            "profile": "default",
            "value": {
              "a": 137,
              "b": 138,
            }
            })
     };
     console.log(requestOptions);
      console.log(url);
      const resp = await fetch(url,requestOptions);
      const json = await resp.json();
      setData(json);
      setLoading(false);
      // TODO: Error handling
    }
  }, []);

  if (loading) {
    return <Wrapper><h2>Loading...</h2></Wrapper>
  }

  return (
      <Wrapper>
              <h2> Response </h2>
              <StyledPre>{loading ? 'Loading...' : JSON.stringify(data, null, 2)}</StyledPre>
      </Wrapper>
  );
}



const StyledPre = styled.pre`
  background-color: #333;
  color: white;
  padding: 10px;
`;

const Wrapper = styled.div`
  padding: 20px 100px;;
`