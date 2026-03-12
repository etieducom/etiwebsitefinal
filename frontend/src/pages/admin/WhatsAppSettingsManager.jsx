import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { 
  MessageSquare, 
  Send, 
  Settings, 
  CheckCircle,
  XCircle,
  Phone,
  Key,
  Hash,
  FileText,
  RefreshCw
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import { Label } from "../../components/ui/label";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const WhatsAppSettingsManager = () => {
  const [settings, setSettings] = useState({
    auth_key: "",
    integrated_number: "918728054145",
    template_name: "eti_certificate",
    template_namespace: "73fda5e9_77e9_445f_82ac_9c2e532b32f4",
    is_enabled: false,
    thank_you_message: "Thank you for your enquiry! Our team will contact you shortly."
  });
  const [maskedKey, setMaskedKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [testPhone, setTestPhone] = useState("");
  const [testName, setTestName] = useState("Test User");
  const [testLoading, setTestLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API}/msg91-settings`);
      setSettings({
        ...settings,
        ...response.data,
        auth_key: "" // Don't populate the actual key
      });
      setMaskedKey(response.data.auth_key_masked || "");
    } catch (error) {
      console.error("Error fetching MSG91 settings:", error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const dataToSend = { ...settings };
      // Only send auth_key if it was changed (not empty)
      if (!settings.auth_key) {
        delete dataToSend.auth_key;
      }
      
      await axios.post(`${API}/msg91-settings`, dataToSend);
      toast.success("WhatsApp settings saved successfully");
      fetchSettings(); // Refresh to get masked key
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const handleTestMessage = async () => {
    if (!testPhone) {
      toast.error("Please enter a phone number to test");
      return;
    }
    
    setTestLoading(true);
    try {
      const response = await axios.post(`${API}/msg91-settings/test?phone=${testPhone}&name=${encodeURIComponent(testName)}`);
      if (response.data.success) {
        toast.success("Test message sent successfully!");
      } else {
        toast.error(response.data.message || "Failed to send test message");
      }
    } catch (error) {
      toast.error("Failed to send test message");
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <div className="space-y-6" data-testid="whatsapp-settings-manager">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1a1a1a] flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-green-600" />
            WhatsApp Notifications (MSG91)
          </h2>
          <p className="text-sm text-[#717171] mt-1">
            Configure automatic WhatsApp messages when forms are submitted
          </p>
        </div>
        <Badge className={settings.is_enabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
          {settings.is_enabled ? (
            <><CheckCircle className="w-3 h-3 mr-1" /> Enabled</>
          ) : (
            <><XCircle className="w-3 h-3 mr-1" /> Disabled</>
          )}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Settings Card */}
        <Card className="card-default">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="w-4 h-4" />
              API Configuration
            </CardTitle>
            <CardDescription>Configure your MSG91 WhatsApp API settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Enable/Disable */}
            <div className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-lg">
              <div>
                <Label className="font-medium">Enable WhatsApp Notifications</Label>
                <p className="text-sm text-[#717171]">Send thank you messages on form submissions</p>
              </div>
              <Switch
                checked={settings.is_enabled}
                onCheckedChange={(checked) => setSettings({...settings, is_enabled: checked})}
                data-testid="whatsapp-enable-toggle"
              />
            </div>

            {/* Auth Key */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Key className="w-4 h-4 text-[#717171]" />
                MSG91 Auth Key
              </Label>
              <Input
                type="password"
                placeholder={maskedKey || "Enter your MSG91 auth key"}
                value={settings.auth_key}
                onChange={(e) => setSettings({...settings, auth_key: e.target.value})}
                className="font-mono"
                data-testid="auth-key-input"
              />
              {maskedKey && (
                <p className="text-xs text-[#717171] mt-1">Current key: {maskedKey}</p>
              )}
            </div>

            {/* Integrated Number */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-[#717171]" />
                Integrated Number
              </Label>
              <Input
                placeholder="918728054145"
                value={settings.integrated_number}
                onChange={(e) => setSettings({...settings, integrated_number: e.target.value})}
                data-testid="integrated-number-input"
              />
              <p className="text-xs text-[#717171] mt-1">Your MSG91 WhatsApp Business number (with country code)</p>
            </div>

            {/* Template Name */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-[#717171]" />
                Template Name
              </Label>
              <Input
                placeholder="eti_certificate"
                value={settings.template_name}
                onChange={(e) => setSettings({...settings, template_name: e.target.value})}
                data-testid="template-name-input"
              />
            </div>

            {/* Template Namespace */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Hash className="w-4 h-4 text-[#717171]" />
                Template Namespace
              </Label>
              <Input
                placeholder="73fda5e9_77e9_445f_82ac_9c2e532b32f4"
                value={settings.template_namespace}
                onChange={(e) => setSettings({...settings, template_namespace: e.target.value})}
                className="font-mono text-sm"
                data-testid="template-namespace-input"
              />
            </div>

            {/* Thank You Message */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-[#717171]" />
                Thank You Message (Body 3)
              </Label>
              <Textarea
                placeholder="Thank you for your enquiry! Our team will contact you shortly."
                value={settings.thank_you_message}
                onChange={(e) => setSettings({...settings, thank_you_message: e.target.value})}
                rows={3}
                data-testid="thank-you-message-input"
              />
              <p className="text-xs text-[#717171] mt-1">This will be sent as body_3 in the template</p>
            </div>

            <Button 
              className="btn-primary w-full" 
              onClick={handleSave}
              disabled={loading}
              data-testid="save-whatsapp-settings"
            >
              {loading ? "Saving..." : "Save Settings"}
            </Button>
          </CardContent>
        </Card>

        {/* Test Card */}
        <Card className="card-default">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Send className="w-4 h-4" />
              Test WhatsApp Message
            </CardTitle>
            <CardDescription>Send a test message to verify your configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Make sure you have enabled WhatsApp notifications 
                and saved your settings before testing.
              </p>
            </div>

            <div>
              <Label className="mb-2 block">Test Phone Number</Label>
              <Input
                placeholder="919876543210"
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
                data-testid="test-phone-input"
              />
              <p className="text-xs text-[#717171] mt-1">Include country code (e.g., 91 for India)</p>
            </div>

            <div>
              <Label className="mb-2 block">Test Name</Label>
              <Input
                placeholder="Test User"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                data-testid="test-name-input"
              />
            </div>

            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={handleTestMessage}
              disabled={testLoading || !settings.is_enabled}
              data-testid="send-test-message"
            >
              {testLoading ? (
                <>Sending...</>
              ) : (
                <><Send className="w-4 h-4 mr-2" /> Send Test Message</>
              )}
            </Button>

            {!settings.is_enabled && (
              <p className="text-xs text-red-500 text-center">
                Enable WhatsApp notifications first to send test messages
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card className="card-default bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Template Variables</h3>
          <p className="text-sm text-blue-700 mb-3">
            The WhatsApp message template uses these variables:
          </p>
          <ul className="text-sm text-blue-700 space-y-1">
            <li><strong>body_1:</strong> User's name (from form)</li>
            <li><strong>body_2:</strong> Form type (e.g., "Quick Enquiry", "Summer Training")</li>
            <li><strong>body_3:</strong> Your thank you message (configured above)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppSettingsManager;
