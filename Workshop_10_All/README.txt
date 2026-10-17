Workshop 10 - Object Relationships

Included:
1. workshop_10_1_car.ts
   - Composition: Car creates and owns Engine and Battery.
2. workshop_10_2_computer.ts
   - Composition: Computer contains CPU, RAM, and Storage.
3. workshop_10_3_order.ts
   - Delegation: Order delegates subtotal calculation to Product.
4. workshop_10_4_doctor_patient.ts
   - Association: Doctor and Patient are independent objects.
5. workshop_10_4_extension.ts
   - Doctor-Patient extension with diagnose(), prescribeMedicine(),
     and calculateTreatmentCost().

Run any file with:
npx ts-node filename.ts

Or compile:
npx tsc filename.ts
node filename.js
