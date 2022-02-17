import * as React from 'react';
import styled from 'styled-components';

import{APIGEE_PROXY_URL} from '@redocly/developer-portal/apigee';

import { getIdPJwt } from '@redocly/developer-portal/ui';

export function ConfigLoader() {
    const GROUP_ID = '415bd98a-c971-4873-81ed-aa30bec19e38';
    const idpIdToken = getIdPJwt();

    const [data, setData] = React.useState(null);
    const [config, setConfig] = React.useState("");

    const form = React.useRef(null)
      
        const submit = e => {
          e.preventDefault()
          const url = APIGEE_PROXY_URL + '/groups/' + GROUP_ID +'/configs';
          const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' ,
                "jwt-token": idpIdToken
            },
            body: JSON.stringify({
                "key": `${config}`,
                "description": "testconfig-portal",
                "profile": "default",
                "value": {
                  "a": 137,
                  "b": 138,
                }
                })
         };
        fetch(url,requestOptions)
        .then(response => response.json())
        .then(data => setData(data));    
        }
      
        return (
          <>
          <div style={divStyle}>
          <form ref={form} onSubmit={submit}>
                <input type="text" name="config" value={config}
                    onChange={(e) => setConfig(e.target.value)} />
                <input type="submit" name="Submit" />
            </form>
            </div>
            <Wrapper>
                    <h2> Response </h2>
                    <StyledPre>{JSON.stringify(data, null, 2)}</StyledPre>
                </Wrapper></>
        )
      
    }


const divStyle = {
        margin: '20px 100px',
        border: '5px'
};

 const StyledPre = styled.pre`
  background-color: #333;
  color: white;
  padding: 10px;
`;

const Wrapper = styled.div`
  padding: 20px 100px;;
`