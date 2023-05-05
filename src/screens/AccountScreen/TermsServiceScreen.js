import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TermsServiceScreen = () => {
  return (
    <ScrollView style={{backgroundColor:'white'}}>
      
      <View style={{backgroundColor: '#10B981', paddingHorizontal: 30, paddingBottom: 20}}>
        <Text style={{fontWeight:'500', fontSize: 16, color:'white', lineHeight: 26}}>Legal Terms</Text>
        <Text style={{fontWeight:'700', fontSize: 14, color:'white'}}>Filipino De Cuisine Terms & Conditions</Text>
        <Text style={{fontWeight:'700', fontSize: 8, color:'white'}}>Last Update: March 25, 2023</Text>
      </View>

      <View style={{paddingHorizontal: 20}}>        
        <View style={{flexDirection:'row', marginVertical: 10,}}>
          <Text style={{fontWeight: '700', fontSize: 10, textAlign: 'justify'}}>1.</Text>
          <Text style={{fontWeight: '400', fontSize: 10, textAlign: 'justify'}}>Information We Collect: We may collect personal information such as your name, email address, phone number, and payment information when you make a reservation or order food through our website. We also collect non-personal information such as your IP address and browser type when you visit our website.</Text>
        </View>
        <View style={{flexDirection:'row', marginBottom: 10,}}>
          <Text style={{fontWeight: '700', fontSize: 10, textAlign: 'justify'}}>2.</Text>
          <Text style={{fontWeight: '400', fontSize: 10, textAlign: 'justify'}}>How We Use Your Information: We use your personal information to process your reservations and orders, communicate with you about your reservations and orders, and improve our services. We may also use your personal information to send you marketing communications, but only if you have given us your consent to do so.</Text>
        </View>
        <View style={{flexDirection:'row', marginBottom: 10,}}>
          <Text style={{fontWeight: '700', fontSize: 10, textAlign: 'justify'}}>3.</Text>
          <Text style={{fontWeight: '400', fontSize: 10, textAlign: 'justify'}}>How We Disclose Your Information: We do not sell, rent, or disclose your personal information to third parties without your consent, except as required by law. We may disclose your personal information to our service providers who assist us in processing your reservations and orders.</Text>
        </View>
        <View style={{flexDirection:'row', marginBottom: 10,}}>
          <Text style={{fontWeight: '700', fontSize: 10, textAlign: 'justify'}}>4.</Text>
          <Text style={{fontWeight: '400', fontSize: 10, textAlign: 'justify'}}>Cookies We use cookies to improve your experience on our website: Cookies are small text files that are stored on your device when you visit our website. We use both session cookies, which expire when you close your browser, and persistent cookies, which remain on your device until they expire or you delete them.</Text>
        </View>
        <View style={{flexDirection:'row', marginBottom: 10,}}>
          <Text style={{fontWeight: '700', fontSize: 10, textAlign: 'justify'}}>5.</Text>
          <Text style={{fontWeight: '400', fontSize: 10, textAlign: 'justify'}}>Security: We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.</Text>
        </View>
        <View style={{flexDirection:'row', marginBottom: 10,}}>
          <Text style={{fontWeight: '700', fontSize: 10, textAlign: 'justify'}}>6.</Text>
          <Text style={{fontWeight: '400', fontSize: 10, textAlign: 'justify'}}>Third-Party Websites: Our website may contain links to third-party websites that are not owned or controlled by Filipino de Cuisine Restaurant. We are not responsible for the content or privacy practices of these websites. You acknowledge and agree that we shall not be liable for any damages or losses arising from your use of these third-party websites.</Text>
        </View>
        <View style={{flexDirection:'row', marginBottom: 10,}}>
          <Text style={{fontWeight: '700', fontSize: 10, textAlign: 'justify'}}>7 .</Text>
          <Text style={{fontWeight: '400', fontSize: 10, textAlign: 'justify'}}>Children's Privacy: Our website is not intended for children under the age of 13, and we do not knowingly collect personal information from children under the age of 13. If we learn that we have collected personal information from a child under the age of 13, we will promptly delete that information.</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default TermsServiceScreen

const styles = StyleSheet.create({})