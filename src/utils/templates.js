export const registerEmailTemplate = (content) => `
  <div style="font-family: Arial, sans-serif; color: #d6cbd1; padding: 20px; background-color: #f4f4f4;">

    <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">

    <h1 style="color: #d11f7b; text-align: center;">SEXWISE PLATFORM!</h1>

      <div style="color:#000000; font-size: 16px; line-height: 1.5; text-align: center;">
        ${content}
      </div>

      <footer style="margin-top: 20px; font-size: 14px; color: #777; text-align: center;">
        <p>&copy; ${new Date().getFullYear()} SexWise. All rights reserved.</p>
      </footer>

    </div>
  </div>
`;