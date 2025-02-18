# RedirectFormLWC

# SKU Auto-Population Form to Case LWC

## Overview

The purpose of this Lightning Web Component (LWC) is to function as a "Form to Case" solution in Salesforce. This component is specifically designed for non-Salesforce users, such as **Providers**, **Inventory Managers**, and **Hub Operators**, who can submit cases directly from the **Experience Cloud Guest User Portal**. The LWC allows users to input an SKU value in a text field, which will automatically populate related information such as measurement and weight from the database. Additionally, it will retrieve hub information when selected.

This solution is implemented within an **LWR (Lightning Web Runtime) site** to provide an optimized experience for external users.

## Features

- **Automatic Population of SKU Details:** When an SKU is entered, its corresponding measurement and weight are auto-populated from the database.
- **Hub Information Retrieval:** The component also fetches relevant hub data when hub information is selected.
- **Support for Multiple SKUs:** The LWC allows the user to enter up to 50 SKUs, and their related information is instantly populated in the form.
- **Experience Cloud Integration:** This LWC is built to be used by non-Salesforce users accessing the system via the Experience Cloud Guest User Portal.
- **LWR Site Compatibility:** The solution is optimized for use within an LWR site, enhancing the user experience for external stakeholders.

## Problem Statement

I initially used **Salesforce Screen Flow** to implement this functionality, but the process was slow, especially when handling multiple SKUs (up to 50). The time it took to load information from the database was much longer than expected, leading to a less-than-ideal user experience.

## Solution

This LWC is designed to streamline the process, directly integrating with Salesforce data to ensure faster and more efficient SKU information retrieval.

---

