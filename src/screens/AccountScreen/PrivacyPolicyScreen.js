import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView style={{backgroundColor:'white'}}>
      
      <View style={{backgroundColor: '#10B981', paddingHorizontal: 30, paddingBottom: 20}}>
        <Text style={{fontWeight:'500', fontSize: 16, color:'white', lineHeight: 26}}>Legal Terms</Text>
        <Text style={{fontWeight:'700', fontSize: 15, color:'white'}}>Filipino De Cuisine Privacy Policy</Text>
        <Text style={{fontWeight:'700', fontSize: 8, color:'white'}}>Last Update: March 25, 2023</Text>
      </View>

      <View style={{paddingHorizontal: 20}}>
        <Text style={{fontWeight: '400', fontSize: 10, textAlign: 'justify', marginVertical: 10,}}>Welcome to Filipino de Cuisine restaurant's website. By accessing or using our website, you agree to be bound by the following terms and conditions:</Text>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontWeight: '700', fontSize: 10, textAlign: 'justify'}}>1.</Text>
          <Text style={{fontWeight: '400', fontSize: 10, textAlign: 'justify'}}>Use of Website Content: All content on our website, including but not limited to, text, graphics, images, logos, and software is the property of Filipino de Cuisine restaurant and is protected by applicable intellectual property laws. You may use the content only for your personal, non-commercial use, and not for any other purpose without our express written consent.</Text>
        </View>
        <View style={{flexDirection:'row', marginBottom: 10,}}>
          <Text style={{fontWeight: '700', fontSize: 10, textAlign: 'justify'}}>2.</Text>
          <Text style={{fontWeight: '400', fontSize: 10, textAlign: 'justify'}}>User Conduct: You agree to use our website only for lawful purposes and in a manner that does not infringe upon the rights of others or interfere with the operation of our website. You may not upload, post, transmit, distribute, or otherwise publish any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, invasive of another's privacy, or otherwise objectionable.</Text>
        </View>
        <View style={{flexDirection:'row', marginBottom: 10,}}>
          <Text style={{fontWeight: '700', fontSize: 10, textAlign: 'justify'}}>3.</Text>
          <Text style={{fontWeight: '400', fontSize: 10, textAlign: 'justify'}}>Reservation: You may make a reservation for a table at our restaurant through our website. All reservations are subject to availability and confirmation by Filipino de Cuisine restaurant.</Text>
        </View>
        <View style={{flexDirection:'row', marginBottom: 10,}}>
          <Text style={{fontWeight: '700', fontSize: 10, textAlign: 'justify'}}>4.</Text>
          <Text style={{fontWeight: '400', fontSize: 10, textAlign: 'justify'}}>Payment: Payment for your meal at our restaurant will be processed in person at the restaurant. We accept cash and major credit cards.</Text>
        </View>
        <View style={{flexDirection:'row', marginBottom: 10,}}>
          <Text style={{fontWeight: '700', fontSize: 10, textAlign: 'justify'}}>5.</Text>
          <Text style={{fontWeight: '400', fontSize: 10, textAlign: 'justify'}}>Links to Third-Party Websites: Our website may contain links to third-party websites that are not owned or controlled by Filipino de Cuisine restaurant. We are not responsible for the content or privacy practices of these websites and do not endorse or make any representations about them.</Text>
        </View>
        <View style={{flexDirection:'row', marginBottom: 10,}}>
          <Text style={{fontWeight: '700', fontSize: 10, textAlign: 'justify'}}>6.</Text>
          <Text style={{fontWeight: '400', fontSize: 10, textAlign: 'justify'}}>Disclaimer of Warranties: We make no representations or warranties of any kind, express or implied, regarding the operation of our website or the information, content, materials, or products included on our website. You use our website at your own risk.</Text>
        </View>
        <View style={{flexDirection:'row', marginBottom: 10,}}>
          <Text style={{fontWeight: '700', fontSize: 10, textAlign: 'justify'}}>7 .</Text>
          <Text style={{fontWeight: '400', fontSize: 10, textAlign: 'justify'}}>Limitation of Liability: We will not be liable for any damages of any kind arising from the use of our website, including but not limited to direct, indirect, incidental, punitive, and consequential damages</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default PrivacyPolicyScreen

const styles = StyleSheet.create({})