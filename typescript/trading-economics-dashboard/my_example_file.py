import matplotlib.pyplot as plt
import pandas as pd
from datetime import datetime

# Raw JSON data
data = [
    {
        "Symbol": "aapl:us:assets",
        "Date": "2023-12-31T00:00:00",
        "last": 353514,
        "value1": 353514,
        "date1": "2023-12-31T00:00:00",
        "value2": 352583,
        "date2": "2023-09-30T00:00:00",
        "value3": 335038,
        "date3": "2023-06-30T00:00:00",
        "value4": 332160,
        "date4": "2023-03-31T00:00:00",
        "unit": "E+06",
        "currency": "USD",
        "frequency": "quarterly",
        "stock": "aapl:us",
        "financialSymbol": "assets",
    },
    {
        "Symbol": "aapl:us:cash-and-equivalent",
        "Date": "2023-12-31T00:00:00",
        "last": 11218,
        "value1": 11218,
        "date1": "2023-12-31T00:00:00",
        "value2": 1606,
        "date2": "2023-09-30T00:00:00",
        "value3": 5094,
        "date3": "2023-06-30T00:00:00",
        "value4": 3510,
        "date4": "2023-03-31T00:00:00",
        "unit": "E+06",
        "currency": "USD",
        "frequency": "quarterly",
        "stock": "aapl:us",
        "financialSymbol": "cash-and-equivalent",
    },
    {
        "Symbol": "aapl:us:trade-creditors",
        "Date": "2023-12-31T00:00:00",
        "last": 54783,
        "value1": 54783,
        "date1": "2023-12-31T00:00:00",
        "value2": 59620,
        "date2": "2023-09-30T00:00:00",
        "value3": 60381,
        "date3": "2023-06-30T00:00:00",
        "value4": 60390,
        "date4": "2023-03-31T00:00:00",
        "unit": "E+06",
        "currency": "USD",
        "frequency": "quarterly",
        "stock": "aapl:us",
        "financialSymbol": "trade-creditors",
    },
    {
        "Symbol": "aapl:us:trade-debtors",
        "Date": "2023-12-31T00:00:00",
        "last": 50102,
        "value1": 50102,
        "date1": "2023-12-31T00:00:00",
        "value2": 60985,
        "date2": "2023-09-30T00:00:00",
        "value3": 39186,
        "date3": "2023-06-30T00:00:00",
        "value4": 35899,
        "date4": "2023-03-31T00:00:00",
        "unit": "E+06",
        "currency": "USD",
        "frequency": "quarterly",
        "stock": "aapl:us",
        "financialSymbol": "trade-debtors",
    },
]

# Convert to DataFrame for easier manipulation
df = pd.DataFrame(data)

# Prepare the data for plotting
df["date1"] = pd.to_datetime(df["date1"])
df["date2"] = pd.to_datetime(df["date2"])
df["date3"] = pd.to_datetime(df["date3"])
df["date4"] = pd.to_datetime(df["date4"])

# Prepare the plot
fig, axs = plt.subplots(4, 1, figsize=(10, 15))

# Assets
axs[0].plot(
    [df["date4"][0], df["date3"][0], df["date2"][0], df["date1"][0]],
    [df["value4"][0], df["value3"][0], df["value2"][0], df["value1"][0]],
    marker="o",
    linestyle="-",
)
axs[0].set_title("AAPL Assets")
axs[0].set_ylabel("Value (in millions)")

# Cash and equivalent
axs[1].plot(
    [df["date4"][1], df["date3"][1], df["date2"][1], df["date1"][1]],
    [df["value4"][1], df["value3"][1], df["value2"][1], df["value1"][1]],
    marker="o",
    linestyle="-",
)
axs[1].set_title("AAPL Cash and Equivalent")
axs[1].set_ylabel("Value (in millions)")

# Trade Creditors
axs[2].plot(
    [df["date4"][2], df["date3"][2], df["date2"][2], df["date1"][2]],
    [df["value4"][2], df["value3"][2], df["value2"][2], df["value1"][2]],
    marker="o",
    linestyle="-",
)
axs[2].set_title("AAPL Trade Creditors")
axs[2].set_ylabel("Value (in millions)")

# Trade Debtors
axs[3].plot(
    [df["date4"][3], df["date3"][3], df["date2"][3], df["date1"][3]],
    [df["value4"][3], df["value3"][3], df["value2"][3], df["value1"][3]],
    marker="o",
    linestyle="-",
)
axs[3].set_title("AAPL Trade Debtors")
axs[3].set_ylabel("Value (in millions)")

plt.tight_layout()
plt.show()
