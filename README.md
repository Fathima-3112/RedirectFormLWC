# RedirectFormLWC
# SKU Auto-Population Form to Case LWC

## Overview

The purpose of this Lightning Web Component (LWC) is to function as a "Form to Case" solution in Salesforce. This component enables the user to input an SKU value in a text field, which will automatically populate related information such as measurement and weight from the database. Additionally, it will retrieve hub information when selected.

## Features

- **Automatic Population of SKU Details:** When an SKU is entered, its corresponding measurement and weight are auto-populated from the database.
- **Hub Information Retrieval:** The component also fetches relevant hub data when hub information is selected.
- **Support for Multiple SKUs:** The LWC allows the user to enter up to 50 SKUs, and their related information is instantly populated in the form.

## Problem Statement

I initially used **Salesforce Screen Flow** to achieve this functionality, but the process was slow, especially when dealing with multiple SKUs (up to 50). The time it took to load information from the database was much longer than expected.

## Solution

This LWC is designed to optimize the process by directly integrating with Salesforce data, making the SKU information retrieval faster and more efficient.

---

