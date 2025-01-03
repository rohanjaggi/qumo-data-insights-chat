## Chat with Jacky - AI Chatbot Interface

This project is a clean, user-friendly interface for interacting with Jacky, an AI assistant designed to explore datasets related to university students' academic stress and mental health management. The chatbot interface is built with React, TailwindCSS, and supports both light and dark themes.

---

### **Approach**

The goal for this project was to make an AI chatbot which was not only able to provide valuable insights, but also create an easy-to-use user experience. 

For this project, Vercel AI SDK was utilised, alongside Google Gemini. The frontend was developed using Tailwind CSS.

---

### **Features**

1. **AI Chat Interface**:

   Users can find insights regarding the dataset by querying through the chat interface. Using Vercel AI SDK's streamText, tools were added to enhance the usability of the chatbot. Currently, the chatbot supports the following tool invocations which provide specific insights on the dataset:

   - Common sources of academic stress reported by students
      - Example query: "What are the most common sources of academic stress reported by students?"
   - Number of responses reporting their mental health below a certain threshold
      - Example query: "How many students rated their mental health below 5?"
   - Most frequently used strategies used to manage stress
      - Example query: "What strategies are most frequently used to manage stress?"
   - Best support services reported by respondents
      - Example query: "What support services do students think would help the most?"
   - Dataset summary
      - Example query: "Give me a summary of the dataset."
      - Summary provided includes:
         1. Top 3 stress sources
         2. Average mental health rating
         3. Most common stress-management strategies
         4. Total number of responses in the dataset

   Responses are provided by Jacky in natural language. Upon submission of the user message, a message "Jacky is typing..." appears to indicate to the user that a response is being generated. The interface itself took inspiration from other popular chat services such as Apple's iMessage and ChatGPT. The colours follow the unique colours of iMessage, with extra rounded corners creating a pill-shaped design and a more modern feel to the interface. 

2. **Introduction Modal**:

   Upon initial load, a popup modal is shown in order to introduce Jacky and her functionalities as an AI chatbot by providing example questions a user is able to ask. This introduction serves to familiarise the user with the chatbot, to allow them to understand the possible use cases. Once read, the modal is removed and the user is shown the chatbot screen for immediate querying. However, should the user still wish to refer back to the contents of the modal, it is still accessible at the top of the screen, next to the header, for ease of viewing.

   This feature improves onboarding by helping first-time users understand the chatbot's capabilities. By providing a welcoming and informative start, it also sets expectations by clearly communicating the type of queries the chatbot can answer.

3. **Thematic Support**:

   The web application includes a toggle in the top right hand corner for switching between light or dark themes. Users can switch the interface's color scheme according to their preference or environment. This feature is implemented using a simple toggle button that dynamically applies the appropriate theme using TailwindCSS classes.

   This feature is used to improve accessibility and user comfort by enhancing **usability** and accommodating diverse user preferences and lighting conditions. It also improves the aesthetic appeal of the page, making it more visually engaging.

4. **Quick Actions**:

   Two predefined buttons were created above the message bar to allow users to send common queries to the chatbot with a single click. For example, users can instantly ask for a summary of the dataset or check the total number of responses without typing. This feature speeds up interaction by reducing the cognitive and physical effort required to input repetitive or frequently asked questions.

   Not only does this shortcut save time for the user, it also reduces the barriers to entry for new users who still may be unaware of what they can ask. It also enhances the **user experience** by making interactions more intuitive and accessible.

5. **Scroll to Botton**:

   The scroll-to-bottom functionality ensures that the chat interface automatically scrolls to display the most recent messages, especially after a new response is generated or sent. The scroll-to-bottom functionality ensures that the chat interface automatically scrolls to display the most recent messages, especially after a new response is generated or sent, similar to many of today's widely used chat services.

   This improves **conversational continuity**, making the chat feel natural and engaging. Additionally, it removes the frustration of manual scrolling and hence, provides a polished and professional user experience that feels responsive, dynamic, and modern.

6. **Message Sanitization**:

   Before the message is parsed and processed, the user's message is sanitized to allow only alphanumeric characters, spaces and punctuation. This feature removes any unwanted or potentially harmful characters from the messages.

   This protects the backend and AI processing pipeline from malicious or unexpected input, reducing the risk of vulnerabilities such as code injection. It also avoids processing unnecessary or disruptive characters that could affect the logic or results of the chatbot's responses.

7. **Error Handling**:

   The application implements error handling to ensure that users receive clear and actionable feedback when issues arise during their interactions with the chatbot. This feature handles various error scenarios, such as invalid queries or unexpected processing errors, in a user-friendly and informative manner.

   For example, if a query is deemed invalid (e.g. not related to the dataset or poorly formatted), the application returns a clear message prompting the user to rephrase or ask a more relevant question. For unforeseen issues, the application provides a generic error message while logging the error details for debugging purposes. Clear error messages inform users about what went wrong without exposing technical details, ensuring professionalism.

8. **Pinned Messages**:

   The pinning feature allows users to highlight and save specific messages for easy reference during their interaction with the chatbot. Users can "pin" a message by clicking the Pin button next to any chat message, which then moves the message to a dedicated "Pinned Messages" section at the top of the interface.

   This feature is designed to enhance usability by enabling users to quickly revisit important information, such as dataset summaries or key insights, without scrolling through the entire chat history. Pinned messages are displayed in a neatly styled section that aligns with the overall layout of the application, maintaining a consistent design.

   Users can also unpin messages when they are no longer needed, ensuring the pinned section remains clutter-free. This feature promotes efficiency and organisation, making the chatbot interaction smoother and more user-friendly.
   
---

### **Limitations**

   1. **Dependency on Predefined Tools**:
      The chatbot relies on predefined tools like countResponses, getMostCommonStressSources, and getDatasetSummary. If a user asks a query outside these scopes, the response might be limited or irrelevant. More tools should be created to provide more in-depth insights.

   2. **Response Accuracy**:
      The chatbot’s responses depend on how well the tools and dataset address the query. Incomplete or biased data can lead to misleading insights.

   3. **Lack of Images/Icons**:
      Due to a limitation on time, text was used to describe buttons rather than icons. For example, the dark/light mode toggle and the send button could both be icons instead in the future.
