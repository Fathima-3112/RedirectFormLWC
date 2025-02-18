import { LightningElement, track } from 'lwc';
import getHubs from '@salesforce/apex/ProductController.getHubs';
import getProductDetails from '@salesforce/apex/ProductController.getProductDetails';
import saveCaseAndSendEmail from '@salesforce/apex/ProductController.saveCaseAndSendEmail';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ToastContainer from 'lightning/toastContainer';
import Toast from 'lightning/toast';



export default class RedirectForm extends LightningElement {
   

    connectedCallback() {
        // Initialize the ToastContainer
        const toastContainer = ToastContainer.instance();
        toastContainer.maxToasts = 5; // Example: set max toasts to 5
        toastContainer.toastPosition = 'top-right'; // Example: set position to top-right
    }

    @track submitterName = '';
    @track submitterEmail = '';
    @track orderNumber = '';
    @track clientLastName = '';
    @track fromHubNumber = '';
    @track toHubNumber = '';
    @track redirectReason = '';
    @track comments = '';
    @track redirectType = '';
    @track numberOfSKUs = '';
    @track skuFields = [];
    @track isLoading = false;
    

    hubOptions = [];
    redirectReasonOptions = [
        { label: 'PVM Product: Vendor Mislabeled', value: 'PVM Product: Vendor Mislabeled' },
        { label: 'LMD Logistics: DC Mislabel', value: 'LMD Logistics: DC Mislabel' },
        { label: 'LMF Logistics: 3PL/Final Mile Mislabel', value: 'LMF Logistics: 3PL/Final Mile Mislabel' },
        { label: 'LUD Logistics: Unable to Deliver', value: 'LUD Logistics: Unable to Deliver' },
        { label: 'SAE Sales: Order Error by Store ', value: 'SAE Sales: Order Error by Store ' },
        { label: 'LWE Logistics: Warehouse Error', value: 'LWE Logistics: Warehouse Error' },
        { label: 'Customer Address Change', value: 'Customer Address Change' },
        { label: 'HUB Transition Activity', value: 'HUB Transition Activity' }
    ];

    requestOptions = [
        { label: '3PL Provider Redirect', value: '3PL Provider Redirect' },
        { label: 'Linehaul Redirect', value: 'Linehaul Redirect' },
        { label: 'Auto Transfer', value: 'Auto Transfer' }
    ];

    skuNumberOptions = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '10', value: '10' },
        { label: '11', value: '11' },
        { label: '12', value: '12' },
        { label: '13', value: '13' },
        { label: '14', value: '14' },
        { label: '15', value: '15' },
        { label: '16', value: '16' },
        { label: '17', value: '17' },
        { label: '18', value: '18' },
        { label: '19', value: '19' },
        { label: '20', value: '20' },
        { label: '21', value: '21' },
        { label: '22', value: '22' },
        { label: '23', value: '23' },
        { label: '24', value: '24' },
        { label: '25', value: '25' },
        { label: '26', value: '26' },
        { label: '27', value: '27' },
        { label: '28', value: '28' },
        { label: '29', value: '29' },
        { label: '30', value: '30' },
        { label: '31', value: '31' },
        { label: '32', value: '32' },
        { label: '33', value: '33' },
        { label: '34', value: '34' },
        { label: '35', value: '35' },
        { label: '36', value: '36' },
        { label: '37', value: '37' },
        { label: '38', value: '38' },
        { label: '39', value: '39' },
        { label: '40', value: '40' },
        { label: '41', value: '41' },
        { label: '42', value: '42' },
        { label: '43', value: '43' },
        { label: '44', value: '44' },
        { label: '45', value: '45' },
        { label: '46', value: '46' },
        { label: '47', value: '47' },
        { label: '48', value: '48' },
        { label: '49', value: '49' },
        { label: '50', value: '50' },
    ];

    connectedCallback() {
        this.loadHubs();
    }

    loadHubs() {
        getHubs()
          .then(result => {
            this.hubOptions = result.map(hub => {
                return { label: hub.Hub_Number__c, value: hub.Hub_Number__c };
            });
            console.log(this.hubOptions); // Check the options
            //this.fromHubNumber = this.hubOptions[0].value;
          // this.toHubNumber = this.hubOptions[0].value;
            this.hubOptions.unshift({ label: 'Select Hub Number', value: '' });
            //this.setDefaultValues(); // Set default values after loading hubs
            this.fromHubNumber = '';
            this.toHubNumber = '';
          })
          .catch(error => {
            this.showToast('Error', 'Error loading hubs', 'error');
          });
      }
      
      handleInputChange(event) {
        const field = event.target.name;
        this[field] = event.target.value;
    }
      
    setDefaultValues() {
        this.fromHubNumber = '';
        this.toHubNumber = '';
    }

      
      
    handleSkuNumberChange(event) {
        this.numberOfSKUs = event.target.value;
        this.skuFields = [];
        for (let i = 0; i < this.numberOfSKUs; i++) {
            this.skuFields.push({ index: i, sku: '', measurement: '', weight: '', serial: '' });
        }
    }

    handleSkuChange(event) {
        const index = event.target.dataset.index;
        const value = event.target.value;

        if (this.skuFields[index]) {
            this.skuFields[index].sku = value;

            getProductDetails({ sku: value })
                .then(product => {
                    if (product) {
                        this.skuFields[index].measurement = product.Measurements__c;
                        this.skuFields[index].weight = product.Master_Carton_Gross_Weight__c;
                    } else {
                        this.skuFields[index].measurement = '';
                        this.skuFields[index].weight = '';
                    }
                    // Update the state to force reactivity
                    this.skuFields = [...this.skuFields];
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    handleWeightChange(event) {
        const index = event.target.dataset.index;
        if (this.skuFields[index]) {
            this.skuFields[index].weight = event.target.value;
            this.skuFields = [...this.skuFields];
        }
    }

    handleSerialChange(event) {
        const index = event.target.dataset.index;
        if (this.skuFields[index]) {
            this.skuFields[index].serial = event.target.value;
            this.skuFields = [...this.skuFields];
        }
    }

    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title,
            message,
            variant,
        });
        this.dispatchEvent(toastEvent);
    }

    handleSubmit() {
        this.isLoading = true;
        const caseDetails = {
            SubmitterName: this.submitterName,
            SubmitterEmail: this.submitterEmail,
            OrderNumber: this.orderNumber,
            ClientLastName: this.clientLastName,
            RedirectType: this.redirectType,
            NumberOfSKUs: this.numberOfSKUs,
            FromHubNumber: this.fromHubNumber,
            ToHubNumber: this.toHubNumber,
            RedirectReason: this.redirectReason,
            Comments: this.comments
        };
        

        this.skuFields.forEach((field, index) => {
            caseDetails[`SKU${index + 1}`] = `SKU: ${field.sku}, Measurement: ${field.measurement}, Weight: ${field.weight}, Serial: ${field.serial}`;
        });

        saveCaseAndSendEmail({ caseDetails, email: this.submitterEmail })
        .then(result => {
            this.isLoading = false;
            console.log('Promise resolved with result:', result); // Add this line
            this.isLoading = false;
            if (result === 'Success') {
              this.showToast('Success', 'Case Submitted Successfully and Email sent to the Submitter','success');
              this.handleReset();
            } else {
              this.isLoading = false;
              this.showToast('Error', 'Failed to Submit the Form', 'error');
            }
        
        });
            

    }

    showToast(title, message, variant){
        Toast.show({
            label:title,
            message: message,
            variant: variant,
            mode: 'dismissable',
            onclose:()=>{
                //do something
            }
        },this);
    }
   
    handleReset() {
        this.isLoading = false;
        this.submitterName = '';
        this.submitterEmail = '';
        this.orderNumber = '';
        this.clientLastName = '';
        this.fromHubNumber = '';
        this.toHubNumber = '';
        this.redirectReason = '';
        this.comments = '';
        this.redirectType = '';
        this.numberOfSKUs = '';
        this.skuFields = [];
        console.log(this.fromHubNumber);
        console.log(this.toHubNumber);
        this.resetSelectField('fromHubNumber', '');
        this.resetSelectField('toHubNumber', '');

    }
    resetSelectField(fieldId, defaultValue) {
        const selectField = this.template.querySelector(`[data-id="${fieldId}"]`);
        if (selectField) {
            selectField.value = defaultValue;
        } else {
            console.error(`Select field with data-id="${fieldId}" not found`);
        }
    }
 
    
}
