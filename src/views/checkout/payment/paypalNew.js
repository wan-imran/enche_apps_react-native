import React, {Component} from 'react';
import {View, WebView, ActivityIndicator} from 'react-native';
import axios from 'axios';

export default class Paypal extends Component {
  state = {
    accessToken: null,
    approvalUrl: null,
    paymentId: null,
  };

  componentDidMount() {
    let currency = '100 INR';
    currency.replace(' INR', '');

    const dataDetail = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      transactions: [
        {
          amount: {
            total: currency,
            currency: 'INR',
            details: {
              subtotal: currency,
              tax: '0',
              shipping: '0',
              handling_fee: '0',
              shipping_discount: '0',
              insurance: '0',
            },
          },
        },
      ],
      redirect_urls: {
        return_url: 'https://developer.enche.com',
        cancel_url: 'https://developer.enche.com',
      },
    };

    axios
      .post(
        'https://api.sandbox.paypal.com/v1/oauth2/token',
        {grant_type: 'client_credentials'},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGYzODU2Mzg0ODMyYjhjYmMxZTY4MjgzNjgwODU5OGRjNjRiY2M5M2FjMzRiNWY1YTA5ZGM1MTA4MzIzNDE4Mjk4NDI0NmNmZDVlZmJkNjEiLCJpYXQiOjE1OTkxMTcxMTEsIm5iZiI6MTU5OTExNzExMSwiZXhwIjoxNjMwNjUzMTExLCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.EsZ4SnmOGu_A2AwoAF6RQWLGgbyoJMRClygl8gv0xzJV_dUlqG-3sFTEWbcT-glTXUAz_2h1ADWLwkACVy-iJsR27wmbnP5S8klIVTqtqFpbZog_4-yo9OOHsYe3Mdf4KiktiFqS8xW6Y1ezn5SAqR4o_5lsLlTS93ZVBq-NxgPeihH4KuFHcwqhL_j1K1u0ZzDuzkQVloqyDNtkdUYLxcWq3Ff_qdDn3S5HedyjnKOlgC80vGCHO_3aJFUccuS4qiEllI4DBqPwOH7j_L03E61ooLaqqd6twlVgqN4wwxBeHFL8ZhZWuuoLHz_MHzmrzBCvdY5FoN3C33KLVj4a0nLPUwH4Ptzo3rByxtXQYStAMj5ShcMIbR6_D8yLohw3y30_Qq-gGlAj2zIer7Q-vux41ytN6ATuHbYJwhv4W8sN76NWXbck9-gXkIvefIPF9BfRzfGXZPMdfT54DIZ4ATcDkR1-wSaydp5E7lpjSA7OBNVG0qzhdevIWVTXw940U5cXRdEvLIEq0kjXIB8DUZuqRYx4Y9P61TVwntMoQB9r_2i1bDHzrWsvtDycvHRMJh7RYEPlFT6cbMOzGiWY_QGnDzW1_7TIhXgPIRNtc7c5ZqESG-WS-HMj7hpdeH7ftNDqk31WDW0FbAFChbrWx04eyu0u1pddvdOFb2qi0lE`, // Your authorization value
          },
        },
      )
      .then(response => {
        this.setState({
          accessToken: response.data.access_token,
        });

        axios
          .post(
            'https://api.sandbox.paypal.com/v1/payments/payment',
            dataDetail,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.state.accessToken}`,
              },
            },
          )
          .then(response => {
            const {id, links} = response.data;
            const approvalUrl = links.find(data => data.rel == 'approval_url');

            this.setState({
              paymentId: id,
              approvalUrl: approvalUrl.href,
            });
          })
          .catch(err => {
            console.log({...err});
          });
      })
      .catch(err => {
        console.log('baba ka dhaba');
        console.log({...err});
      });
  }

  _onNavigationStateChange = webViewState => {
    if (webViewState.url.includes('https://developer.enche.com/')) {
      this.setState({
        approvalUrl: null,
      });

      const {PayerID, paymentId} = webViewState.url;

      axios
        .post(
          `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
          {payer_id: PayerID},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.state.accessToken}`,
            },
          },
        )
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log({...err});
        });
    }
  };

  render() {
    const {approvalUrl} = this.state;
    return (
      <View style={{flex: 1}}>
        {approvalUrl ? (
          <WebView
            style={{height: 400, width: 300}}
            source={{uri: approvalUrl}}
            onNavigationStateChange={this._onNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            style={{marginTop: 20}}
          />
        ) : (
          <ActivityIndicator />
        )}
      </View>
    );
  }
}
